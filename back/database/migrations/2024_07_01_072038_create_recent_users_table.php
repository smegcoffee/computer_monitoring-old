<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recent_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('computer_id')->constrained()->onDelete('restrict');
            $table->foreignId('unit_id')->constrained()->onDelete('restrict');
            $table->foreignId('computer_user_id')->constrained()->onDelete('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recent_users');
    }
};
