import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dj5iczrtl',
    api_key: '123999821775541',
    api_secret: 'BLCfKEhOvR6IbYyHNKynfxzllJk', // Click 'View API Keys' above to copy your API secret
});

export const getImageUrl = (publicId: string) => {
    return cloudinary.url(publicId, {
        secure: true,
    });
}

export async function test() {
    // Configuration

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
            public_id: 'shoes',
        })
        .catch((error) => {
            console.log(error);
        });

    console.log(uploadResult);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto',
    });

    console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });

    console.log(autoCropUrl);
}

export default cloudinary;