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
        Schema::create('text_channels', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->uuid("server_id");
            $table->string("name", 100)->nullable(false)->default("general");
            $table->timestamps();

            $table->foreign("server_id")->references("id")->on("servers");
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('text_channels');
    }
};
