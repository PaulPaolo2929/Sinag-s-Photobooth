<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->string('image_data'); // Base64 encoded image
            $table->string('layout_type')->nullable(); // strip or grid
            $table->string('variety_type')->nullable(); // border or borderless
            $table->integer('shot_number')->nullable(); // Which shot number (1-8)
            $table->boolean('is_selected')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('photos');
    }
};
