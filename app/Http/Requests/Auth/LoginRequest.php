<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Allow anyone to attempt login
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
           'email' => ['required', 'string', 'email'],
           'password' => ['required', 'string'],
        ];
    }

    public function messages(): array {
        return [
            'email.required' => 'Email is required',
            'email.email' => 'Invalid email address', 
            'email.string' => 'Email must be a string',
            'password.required' => 'Password is required',
        ];
    }
}
