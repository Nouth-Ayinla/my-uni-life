-- Create enums for different roles and statuses
CREATE TYPE public.user_role AS ENUM ('student', 'vendor', 'driver', 'admin', 'super_admin');
CREATE TYPE public.verification_status AS ENUM ('pending', 'approved', 'rejected', 'flagged');
CREATE TYPE public.user_status AS ENUM ('active', 'suspended', 'banned');
CREATE TYPE public.content_status AS ENUM ('active', 'flagged', 'removed');
CREATE TYPE public.transaction_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE public.ride_status AS ENUM ('pending', 'accepted', 'in_progress', 'completed', 'cancelled');

-- Universities table
CREATE TABLE public.universities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    university_id UUID REFERENCES public.universities(id),
    role public.user_role DEFAULT 'student',
    verification_status public.verification_status DEFAULT 'pending',
    user_status public.user_status DEFAULT 'active',
    full_name TEXT,
    phone_number TEXT,
    department TEXT,
    student_id TEXT,
    profile_picture_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Driver details table
CREATE TABLE public.driver_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    license_number TEXT NOT NULL,
    vehicle_type TEXT,
    vehicle_plate_number TEXT,
    vehicle_color TEXT,
    license_expiry DATE,
    rating DECIMAL(2,1) DEFAULT 0.0,
    total_rides INTEGER DEFAULT 0,
    verification_documents JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Vendor profiles table
CREATE TABLE public.vendor_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    business_description TEXT,
    business_category TEXT,
    commission_rate DECIMAL(4,2) DEFAULT 10.0,
    total_sales DECIMAL(10,2) DEFAULT 0.0,
    verification_documents JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Posts/Content table
CREATE TABLE public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media_urls TEXT[],
    post_type TEXT DEFAULT 'general',
    status public.content_status DEFAULT 'active',
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    flagged_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Comments table
CREATE TABLE public.comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    status public.content_status DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Products table
CREATE TABLE public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    vendor_id UUID REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category TEXT,
    images TEXT[],
    status public.content_status DEFAULT 'active',
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Orders/Transactions table
CREATE TABLE public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    buyer_id UUID REFERENCES public.profiles(id),
    vendor_id UUID REFERENCES public.vendor_profiles(id),
    product_id UUID REFERENCES public.products(id),
    quantity INTEGER NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status public.transaction_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Rides table
CREATE TABLE public.rides (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    rider_id UUID REFERENCES public.profiles(id),
    driver_id UUID REFERENCES public.driver_profiles(id),
    pickup_location TEXT NOT NULL,
    destination TEXT NOT NULL,
    fare DECIMAL(8,2),
    status public.ride_status DEFAULT 'pending',
    pickup_time TIMESTAMP WITH TIME ZONE,
    completion_time TIMESTAMP WITH TIME ZONE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Flagged content table
CREATE TABLE public.flagged_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content_type TEXT NOT NULL, -- 'post', 'comment', 'product', 'user'
    content_id UUID NOT NULL,
    reported_by UUID REFERENCES public.profiles(id),
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    reviewed_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Announcements table
CREATE TABLE public.announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_by UUID REFERENCES public.profiles(id),
    target_audience TEXT DEFAULT 'all', -- 'all', 'students', 'vendors', 'drivers'
    priority TEXT DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User ban history
CREATE TABLE public.user_bans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id),
    banned_by UUID REFERENCES public.profiles(id),
    reason TEXT NOT NULL,
    ban_type TEXT DEFAULT 'temporary', -- 'temporary', 'permanent'
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert sample universities
INSERT INTO public.universities (name, location, code) VALUES
('University of Lagos', 'Lagos State', 'UNILAG'),
('University of Ibadan', 'Oyo State', 'UI'),
('Ahmadu Bello University', 'Kaduna State', 'ABU'),
('University of Nigeria', 'Enugu State', 'UNN'),
('Obafemi Awolowo University', 'Osun State', 'OAU'),
('University of Benin', 'Edo State', 'UNIBEN'),
('Federal University of Technology Akure', 'Ondo State', 'FUTA'),
('Lagos State University', 'Lagos State', 'LASU'),
('Covenant University', 'Ogun State', 'CU'),
('Babcock University', 'Ogun State', 'BU');

-- Enable RLS on all tables
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flagged_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bans ENABLE ROW LEVEL SECURITY;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS public.user_role AS $$
    SELECT role FROM public.profiles WHERE id = user_id;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
    SELECT role IN ('admin', 'super_admin') FROM public.profiles WHERE id = user_id;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for universities (public read)
CREATE POLICY "Universities are viewable by everyone" ON public.universities
    FOR SELECT USING (true);

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for posts
CREATE POLICY "Posts are viewable by authenticated users" ON public.posts
    FOR SELECT TO authenticated USING (status = 'active');

CREATE POLICY "Users can create posts" ON public.posts
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all posts" ON public.posts
    FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for announcements
CREATE POLICY "Announcements are viewable by authenticated users" ON public.announcements
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage announcements" ON public.announcements
    FOR ALL USING (public.is_admin(auth.uid()));

-- Create trigger to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();