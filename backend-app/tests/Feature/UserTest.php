<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    // use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function testRegisterSuccess() {
        $this->post('/api/register', [
            'display_name' => 'John Doe',
            'username' => 'johndoe',
            'email' => 'johndoe@example.com',
            'password' => 'password',
        ])->assertStatus(201);
    } 
}
