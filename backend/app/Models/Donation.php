<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'donation_code',
    'donor',
    'type',
    'value',
    'date_received',
    'allocated_to',
    'status',
    'recorded_by',
])]
class Donation extends Model
{
    //
}