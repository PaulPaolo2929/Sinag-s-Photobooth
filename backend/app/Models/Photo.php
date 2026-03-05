<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    protected $fillable = [
        'image_data',
        'layout_type',
        'variety_type',
        'shot_number',
        'is_selected',
    ];

    protected $casts = [
        'is_selected' => 'boolean',
    ];
}
