<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PhotoController extends Controller
{
    /**
     * Store a new photo
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'image_data' => 'required|string',
            'layout_type' => 'nullable|string',
            'variety_type' => 'nullable|string',
            'shot_number' => 'nullable|integer',
            'is_selected' => 'nullable|boolean',
        ]);

        $photo = Photo::create([
            'image_data' => $validated['image_data'],
            'layout_type' => $validated['layout_type'] ?? null,
            'variety_type' => $validated['variety_type'] ?? null,
            'shot_number' => $validated['shot_number'] ?? null,
            'is_selected' => $validated['is_selected'] ?? false,
        ]);

        return response()->json([
            'success' => true,
            'photo' => $photo,
        ], 201);
    }

    /**
     * Get all photos
     */
    public function index(): JsonResponse
    {
        $photos = Photo::orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'photos' => $photos,
        ]);
    }

    /**
     * Get selected photos only
     */
    public function selected(): JsonResponse
    {
        $photos = Photo::where('is_selected', true)
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json([
            'success' => true,
            'photos' => $photos,
        ]);
    }

    /**
     * Update photo selection status
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $photo = Photo::findOrFail($id);

        $validated = $request->validate([
            'is_selected' => 'sometimes|boolean',
        ]);

        $photo->update($validated);

        return response()->json([
            'success' => true,
            'photo' => $photo,
        ]);
    }

    /**
     * Delete a photo
     */
    public function destroy(int $id): JsonResponse
    {
        $photo = Photo::findOrFail($id);
        $photo->delete();

        return response()->json([
            'success' => true,
            'message' => 'Photo deleted successfully',
        ]);
    }

    /**
     * Clear all photos (for new session)
     */
    public function clear(): JsonResponse
    {
        Photo::truncate();

        return response()->json([
            'success' => true,
            'message' => 'All photos cleared successfully',
        ]);
    }
}
