<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class TestDatabase extends TestCase
{
    /**
     * A basic feature test example.
     */

    public function testDatabaseConnection()
    {
        $this->assertTrue(DB::connection()->getDatabaseName() == 'clone_discord');
        
        $this->assertTrue(
            config('database.connections.mysql.host') == env('DB_HOST') &&
            config('database.connections.mysql.port') == env('DB_PORT') &&
            config('database.connections.mysql.database') == env('DB_DATABASE') &&
            config('database.connections.mysql.username') == env('DB_USERNAME')
        );
    }
}
