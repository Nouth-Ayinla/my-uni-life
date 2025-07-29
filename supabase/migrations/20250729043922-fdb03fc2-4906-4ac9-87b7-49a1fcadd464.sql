-- Add logo_url column to universities table
ALTER TABLE public.universities 
ADD COLUMN logo_url TEXT;

-- Update existing universities with placeholder logos
UPDATE public.universities 
SET logo_url = CASE 
  WHEN name = 'University of Lagos' THEN 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/University_of_Lagos_coat_of_arms.png/200px-University_of_Lagos_coat_of_arms.png'
  WHEN name = 'University of Ibadan' THEN 'https://upload.wikimedia.org/wikipedia/en/thumb/5/50/University_of_Ibadan_logo.png/200px-University_of_Ibadan_logo.png'
  WHEN name = 'Ahmadu Bello University' THEN 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Ahmadu_Bello_University_logo.png/200px-Ahmadu_Bello_University_logo.png'
  WHEN name = 'University of Nigeria' THEN 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/University_of_Nigeria_logo.png/200px-University_of_Nigeria_logo.png'
  WHEN name = 'Obafemi Awolowo University' THEN 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Obafemi_Awolowo_University_logo.png/200px-Obafemi_Awolowo_University_logo.png'
  WHEN name = 'University of Benin' THEN 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/University_of_Benin_logo.png/200px-University_of_Benin_logo.png'
  WHEN name = 'Lagos State University' THEN 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/Lagos_State_University_logo.png/200px-Lagos_State_University_logo.png'
  WHEN name = 'Covenant University' THEN 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Covenant_University_logo.png/200px-Covenant_University_logo.png'
  WHEN name = 'Babcock University' THEN 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Babcock_University_logo.png/200px-Babcock_University_logo.png'
  WHEN name = 'Federal University of Technology Akure' THEN 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/FUTA_logo.png/200px-FUTA_logo.png'
  ELSE 'https://via.placeholder.com/200x200/4f46e5/ffffff?text=' || SUBSTR(name, 1, 2)
END;