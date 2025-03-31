<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class DBTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test untuk memeriksa struktur tabel users
     */
    public function testUsersTableName(): void
    {
        $this->assertTrue(Schema::hasTable('users'));
    }
}
