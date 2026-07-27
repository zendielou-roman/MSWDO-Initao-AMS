<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    protected $fillable = [
        'full_name',
        'is_anonymous',
        'barangay',
        'email',
        'mobile_number',
        'subject',
        'message',
        'status',
        'assigned_to',
    ];

    protected $casts = [
        'is_anonymous' => 'boolean',
    ];
}