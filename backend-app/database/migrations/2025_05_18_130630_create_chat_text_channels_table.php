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
        Schema::create('chat_text_channels', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->uuid("user_id");
            $table->uuid('text_channel_id');
            $table->text("message")->nullable(false);
            $table->timestamps();

            $table->foreign("user_id")->on("users")->references("id");
            $table->foreign("text_channel_id")->on("text_channels")->references("id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_text_channels');
    }
};
