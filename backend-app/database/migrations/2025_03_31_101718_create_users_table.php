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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('display_name', 30)->nullable(false);
            $table->string('username', 30)->unique()->nullable(false);
            $table->string('email',100)->unique()->nullable(false);
            $table->string('password',100)->nullable(false);
            $table->boolean('status')->nullable();
            $table->string('about_me', 100)->nullable();
            $table->boolean('is_online')->default(false);
            $table->string('token',100)->unique()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
