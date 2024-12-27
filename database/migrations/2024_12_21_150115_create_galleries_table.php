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
    Schema::create('galleries', function (Blueprint $table) {
      $table->bigIncrements('id')->primary();
      $table->string('name_url');
      $table->text('title');
      $table->text('description')->nullable();
      $table->date('event_date')->nullable();
      $table->integer('width')->nullable();
      $table->integer('height')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('galleries');
  }
};
