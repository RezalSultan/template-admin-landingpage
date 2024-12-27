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
    Schema::create('blog_sections', function (Blueprint $table) {
      $table->bigIncrements('id')->primary();
      $table->foreignId('blog_id')->references('id')->on('blogs')->onDelete('cascade');
      $table->integer('order');
      $table->string('type_view_content')->nullable();
      $table->string('url_asset')->nullable();
      $table->string('caption')->nullable();
      $table->string('sub_title')->nullable();
      $table->longText('body')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('blog_sections');
  }
};
