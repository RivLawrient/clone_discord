<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;

class ExampleController extends Controller
{
    /**
     * Contoh method dengan parameter custom yang mengakses user ID dari middleware
     *
     * @param Request $request
     * @param string $customParam
     * @return JsonResponse
     */
    public function exampleWithParam(Request $request, string $customParam): JsonResponse
    {
        // Mengakses user ID dari middleware
        $userId = $request->user;
        
        // Mendapatkan data user dari database menggunakan ID
        $user = User::find($userId);
        
        return response()->json([
            'data' => [
                'user_id' => $userId,
                'user_name' => $user->display_name,
                'custom_param' => $customParam,
                'message' => 'Berhasil mengakses user ID dari middleware dengan parameter custom'
            ]
        ]);
    }
    
    /**
     * Contoh method dengan multiple parameter custom
     *
     * @param Request $request
     * @param string $param1
     * @param int $param2
     * @return JsonResponse
     */
    public function exampleWithMultipleParams(Request $request, string $param1, int $param2): JsonResponse
    {
        // Mengakses user ID dari middleware
        $userId = $request->user;
        
        // Mendapatkan data user dari database menggunakan ID
        $user = User::find($userId);
        
        return response()->json([
            'data' => [
                'user_id' => $userId,
                'user_name' => $user->display_name,
                'param1' => $param1,
                'param2' => $param2,
                'message' => 'Berhasil mengakses user ID dari middleware dengan multiple parameter'
            ]
        ]);
    }
    
    /**
     * Contoh method dengan parameter custom dan query string
     *
     * @param Request $request
     * @param string $customParam
     * @return JsonResponse
     */
    public function exampleWithQueryString(Request $request, string $customParam): JsonResponse
    {
        // Mengakses user ID dari middleware
        $userId = $request->user;
        
        // Mengakses query string
        $queryParam = $request->query('query_param', 'default_value');
        
        return response()->json([
            'data' => [
                'user_id' => $userId,
                'custom_param' => $customParam,
                'query_param' => $queryParam,
                'message' => 'Berhasil mengakses user ID dari middleware dengan query string'
            ]
        ]);
    }
} 