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
        Schema::create('voice_channels', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->uuid("server_id");
            $table->string("name", 100)->nullable(false)->default("General");
            $table->timestamps();

            $table->foreign("server_id")->on("servers")->references("id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voice_channels');
    }
};
