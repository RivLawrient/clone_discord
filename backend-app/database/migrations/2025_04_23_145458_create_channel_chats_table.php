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
        Schema::create('channel_chats', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('room_server_id');
            $table->string('user_id');
            $table->text('message');
            $table->timestamps();

            $table->foreign('room_server_id')->references('id')->on('room_servers');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('channel_chats');
    }
};
