<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'beneficiary_code',
    'name',
    'barangay',
    'track',
    'project',
    'capital',
    'date_enrolled',
    'status',
    'enrolled_by',
])]
class SlpBeneficiary extends Model
{
    //
}
