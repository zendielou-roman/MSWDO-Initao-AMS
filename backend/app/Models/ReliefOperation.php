<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'operation_code',
    'event',
    'type',
    'date',
    'barangay',
    'beneficiaries',
    'beneficiary_unit',
    'items_distributed',
    'item_unit',
    'status',
    'logged_by',
])]
class ReliefOperation extends Model
{
    //
}
