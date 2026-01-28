<?php

namespace App\Services;

use Cloudinary\Cloudinary;
use Illuminate\Http\UploadedFile;

class CloudinaryService
{
    protected Cloudinary $cloudinary;

    public function __construct()
    {
        $this->cloudinary = app(Cloudinary::class);
    }

    /**
     * Upload an image to Cloudinary
     *
     * @param UploadedFile $file The uploaded file
     * @param string $folder The folder to store the image in (e.g., 'products', 'categories', 'shops')
     * @return string The secure URL of the uploaded image
     */
    public function upload(UploadedFile $file, string $folder = 'uploads'): string
    {
        $result = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
            'folder' => $folder,
            'resource_type' => 'image',
        ]);

        return $result['secure_url'];
    }

    /**
     * Delete an image from Cloudinary
     *
     * @param string $url The Cloudinary URL of the image to delete
     * @return bool Whether the deletion was successful
     */
    public function delete(string $url): bool
    {
        $publicId = $this->extractPublicId($url);
        
        if (!$publicId) {
            return false;
        }

        try {
            $this->cloudinary->uploadApi()->destroy($publicId);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Check if a URL is a Cloudinary URL
     *
     * @param string $url
     * @return bool
     */
    public function isCloudinaryUrl(string $url): bool
    {
        return str_contains($url, 'res.cloudinary.com');
    }

    /**
     * Extract the public ID from a Cloudinary URL
     *
     * @param string $url The Cloudinary URL
     * @return string|null The public ID or null if extraction fails
     */
    private function extractPublicId(string $url): ?string
    {
        if (!$this->isCloudinaryUrl($url)) {
            return null;
        }

        // Cloudinary URLs are like: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/filename.jpg
        // We need to extract: folder/filename (without extension)
        $pattern = '/\/v\d+\/(.+)\.[a-zA-Z]+$/';
        
        if (preg_match($pattern, $url, $matches)) {
            return $matches[1];
        }

        return null;
    }
}
