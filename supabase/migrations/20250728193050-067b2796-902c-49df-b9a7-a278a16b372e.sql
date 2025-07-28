-- Fix security issues: Add missing RLS policies and fix function search paths

-- Fix function search paths
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS public.user_role AS $$
    SELECT role FROM public.profiles WHERE id = user_id;
$$ LANGUAGE SQL SECURITY DEFINER STABLE
SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
    SELECT role IN ('admin', 'super_admin') FROM public.profiles WHERE id = user_id;
$$ LANGUAGE SQL SECURITY DEFINER STABLE
SET search_path = public;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'student')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- Add missing RLS policies for driver_profiles
CREATE POLICY "Users can view their own driver profile" ON public.driver_profiles
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own driver profile" ON public.driver_profiles
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own driver profile" ON public.driver_profiles
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all driver profiles" ON public.driver_profiles
    FOR ALL USING (public.is_admin(auth.uid()));

-- Add missing RLS policies for vendor_profiles
CREATE POLICY "Users can view their own vendor profile" ON public.vendor_profiles
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own vendor profile" ON public.vendor_profiles
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own vendor profile" ON public.vendor_profiles
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all vendor profiles" ON public.vendor_profiles
    FOR ALL USING (public.is_admin(auth.uid()));

-- Add missing RLS policies for comments
CREATE POLICY "Comments are viewable by authenticated users" ON public.comments
    FOR SELECT TO authenticated USING (status = 'active');

CREATE POLICY "Users can create comments" ON public.comments
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON public.comments
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all comments" ON public.comments
    FOR ALL USING (public.is_admin(auth.uid()));

-- Add missing RLS policies for products
CREATE POLICY "Products are viewable by authenticated users" ON public.products
    FOR SELECT TO authenticated USING (status = 'active');

CREATE POLICY "Vendors can manage their own products" ON public.products
    FOR ALL USING (
        vendor_id IN (
            SELECT id FROM public.vendor_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage all products" ON public.products
    FOR ALL USING (public.is_admin(auth.uid()));

-- Add missing RLS policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
    FOR SELECT USING (
        buyer_id = auth.uid() OR 
        vendor_id IN (
            SELECT id FROM public.vendor_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create orders" ON public.orders
    FOR INSERT WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "Vendors can update their orders" ON public.orders
    FOR UPDATE USING (
        vendor_id IN (
            SELECT id FROM public.vendor_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage all orders" ON public.orders
    FOR ALL USING (public.is_admin(auth.uid()));

-- Add missing RLS policies for rides
CREATE POLICY "Users can view their own rides" ON public.rides
    FOR SELECT USING (
        rider_id = auth.uid() OR 
        driver_id IN (
            SELECT id FROM public.driver_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create ride requests" ON public.rides
    FOR INSERT WITH CHECK (rider_id = auth.uid());

CREATE POLICY "Drivers can update their rides" ON public.rides
    FOR UPDATE USING (
        driver_id IN (
            SELECT id FROM public.driver_profiles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage all rides" ON public.rides
    FOR ALL USING (public.is_admin(auth.uid()));

-- Add missing RLS policies for flagged_content
CREATE POLICY "Users can view flagged content they reported" ON public.flagged_content
    FOR SELECT USING (reported_by = auth.uid() OR public.is_admin(auth.uid()));

CREATE POLICY "Users can report content" ON public.flagged_content
    FOR INSERT WITH CHECK (reported_by = auth.uid());

CREATE POLICY "Admins can manage flagged content" ON public.flagged_content
    FOR ALL USING (public.is_admin(auth.uid()));

-- Add missing RLS policies for user_bans
CREATE POLICY "Users can view their own ban history" ON public.user_bans
    FOR SELECT USING (user_id = auth.uid() OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage user bans" ON public.user_bans
    FOR ALL USING (public.is_admin(auth.uid()));