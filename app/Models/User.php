<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public static function registerUser(array $data): array
    {
        try {
            // Check if user already exists
            if (self::where('email', $data['email'])->exists()) {
                return [
                    'success' => false,
                    'message' => 'Email is already taken'
                ];
            }

            // Create user
            $user = self::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            // Generate token
            $token = $user->createToken('auth_token')->plainTextToken;

            Log::info('User registered successfully', ['user_id' => $user->id]);

            return [
                'success' => true,
                'user' => $user,
                'token' => $token,
                'message' => 'User registered successfully',
            ];
        } catch (\Exception $e) {
            Log::error('Registration error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            
            return [
                'success' => false,
                'message' => 'Registration failed: ' . $e->getMessage()
            ];
        }
    }

    public static function loginUser(array $data): array
    {
        try {
            Log::info('Login attempt', ['email' => $data['email']]);

            // Attempt authentication
            if (Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
                $user = Auth::user();
                $token = $user->createToken('auth_token')->plainTextToken;
                
                Log::info('Login successful', ['user_id' => $user->id]);
                
                return [
                    'success' => true,
                    'user' => $user,
                    'token' => $token,
                    'message' => 'Login successful'
                ];
            }
            
            Log::warning('Login failed - invalid credentials', ['email' => $data['email']]);
            
            return [
                'success' => false,
                'message' => 'Invalid credentials'
            ];
        } catch (\Exception $e) {
            Log::error('Login error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            
            return [
                'success' => false,
                'message' => 'Login failed: ' . $e->getMessage()
            ];
        }
    }


    public static function logoutUser(): array
    {
        try {
            $user = Auth::user();
            
            if ($user) {
                $userId = $user->id;
                // Revoke all tokens
                $user->tokens()->delete();
                
                Log::info('Logout successful', ['user_id' => $userId]);
                
                return [
                    'success' => true,
                    'message' => 'Logged out successfully'
                ];
            }
            
            return [
                'success' => false,
                'message' => 'No authenticated user found'
            ];
        } catch (\Exception $e) {
            Log::error('Logout error: ' . $e->getMessage());
            
            return [
                'success' => false,
                'message' => 'Logout failed: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Get user by email
     * 
     * @param string $email
     * @return User|null
     */
    public static function findByEmail(string $email)
    {
        return self::where('email', $email)->first();
    }

    /**
     * Check if email exists
     * 
     * @param string $email
     * @return bool
     */
    public static function emailExists(string $email): bool
    {
        return self::where('email', $email)->exists();
    }
}