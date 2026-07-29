<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('relief_operations', function (Blueprint $table) {
            $table->id();
            $table->string('operation_code')->unique();
            $table->string('event');
            $table->string('type');
            $table->date('date');
            $table->string('barangay');
            $table->unsignedInteger('beneficiaries')->default(0);
            $table->string('beneficiary_unit')->nullable();
            $table->unsignedInteger('items_distributed')->default(0);
            $table->string('item_unit')->nullable();
            $table->string('status')->default('Planned');
            $table->string('logged_by')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('relief_operations');
    }
};