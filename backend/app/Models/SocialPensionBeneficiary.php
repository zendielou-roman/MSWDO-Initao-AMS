<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'pension_code',
    'name',
    'age',
    'barangay',
    'osca_id',
    'source',
    'date_registered',
    'last_payout',
    'status',
    'registered_by',
])]
class SocialPensionBeneficiary extends Model
{
    //
}
