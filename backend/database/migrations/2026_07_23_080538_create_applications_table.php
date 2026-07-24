<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->string('application_code')->unique();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            $table->string('submitted_by')->nullable();
            $table->string('type')->nullable();
            $table->unsignedInteger('amount')->default(0);
            $table->string('barangay')->nullable();
            $table->date('date_submitted');
            $table->string('status')->default('Pending');

            // Assessment
            $table->string('income_expenditure')->nullable();
            $table->string('economic_condition')->nullable();
            $table->json('problems_presented')->nullable();
            $table->string('other_problem')->nullable();
            $table->json('client_categories')->nullable();
            $table->text('specific_findings')->nullable();

            // Evaluation / Recommendation
            $table->json('evaluation_factors')->nullable();
            $table->string('eligibility')->nullable();
            $table->text('recommendation')->nullable();
            $table->string('informant_name')->nullable();
            $table->string('interviewed_by')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};