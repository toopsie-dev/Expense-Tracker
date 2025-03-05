<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public static function registerUser(array $data) : array {
        try {
            $user = self::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return [
                'success' => true,
                'user' => $user,
                'token' =>  $token,
                'message' => 'User registered successfully',
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Registration failed: ' . $e->getMessage()
            ];
        }
    }

    public static function loginUser(array $data) : array {
        try {
            $user = self::where('email', $data['email'])->first();

            if (!$user || !Hash::check($data['password'], $user->password)) {
                return [
                    'success' => false,
                    'message' => 'Invalid credentials'
                ];
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return [
                'success' => true,
                'user' => $user,
                'token' => $token,
                'message' => 'Login successful'
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Login failed: ' . $e->getMessage()
            ];
        }
    }

}