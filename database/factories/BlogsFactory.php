<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class BlogsFactory extends Factory
{
    public function definition(): array
    {
        $title = $this->faker->sentence;

        return [
            'title' => $title,
            'description' => fake()->name(), // short summary
            'content' => fake()->name(), // full content
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
