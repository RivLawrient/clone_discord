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
            $table->string('banner_color', 10)->nullable(false)->default('#000000');
            $table->string('username', 30)->unique()->nullable(false);
            $table->string('email',100)->unique()->nullable(false);
            $table->string('password',100)->nullable(false);
            $table->date('date_of_birth')->nullable(false);
            $table->string('status', 30)->nullable();
            $table->string('about_me', 100)->nullable();
            $table->string('picture', 100)->nullable();
            $table->boolean('is_online')->default(false)->nullable(false);
            $table->timestamp('last_active')->nullable();
            $table->string('token',100)->unique()->nullable();
            $table->integer('token_exp')->nullable();
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
