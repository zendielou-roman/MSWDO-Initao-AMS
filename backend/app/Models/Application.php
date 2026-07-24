<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'application_code',
    'client_id',
    'submitted_by',
    'type',
    'amount',
    'barangay',
    'date_submitted',
    'status',
    'income_expenditure',
    'economic_condition',
    'problems_presented',
    'other_problem',
    'client_categories',
    'specific_findings',
    'evaluation_factors',
    'eligibility',
    'recommendation',
    'informant_name',
    'interviewed_by',
])]
class Application extends Model
{
    protected $casts = [
        'problems_presented' => 'array',
        'client_categories' => 'array',
        'evaluation_factors' => 'array',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
