# My Thyme website created using MERN stack

## Project Goals

The purpose of this project is to create a website that allows an admin user to upload cooking recipe blog posts and have other users read and comment on those posts.

## Requirements

### Login

    Users will be able to log in to their accounts to identify their comments and restrict blog posting ability to admins.

### Create Recipes

    Admin users will be able to store recipes to the database that can be reused across blogs.
    Recipes will include:
    - Name
    - Ingredients
    - Instructions
    - Cook time
    - Prep time

### Create blog posts

    Admin users will be able to create and edit blogs with the following features.
    - Write and format text for the post
    - Embed photos within the post
    - Embed recipes within the post

### Write comments

    Logged in users will be able to post comments below blog posts and respond to each other's comments.

### Moderate comments

    Admin users will be able to delete or block comments of the other users

### Search for blogs and recipes

    Users will be able to search through blogs and recipes by title or tag

### Leave rating

    Logged in users will be able to leave a rating on recipes

## api routes

### /user

#### api/user

    -get: get info for all users
        restricted to admin

#### api/user/:id

    -get: get info for a specific user
        restricted to the relevent user or an admin
    -patch: edit info for a specific user
        restricted to the relevent user or an admin
    -delete: delete a user
        restricted to the relevent user or an admin

#### api/user/:id/admin

    -patch: edit restricted info for user
        restricted to admin

#### api/user/login

    -post: log in as a user

#### api/user/signup

    -post: create a new user

### /recipe

#### api/recipe

    -get: get all recipes
    -post: create a new recipe
        restricted to admin

#### api/recipe/:id

    -get: get a specific recipe
    -patch: edit a recipe
        restricted to admin
    -delete: delete a recipe
        restricted to admin

#### api/recipe/:id/review

    -post: post a review
        restricted to loggedIn users

### /blog

#### api/blog

    -get: get json data for all blog posts
    -post: create a new blog post
        restricted to admin

#### api/blog/:id

    -get: get a specific blog post
    -patch: edit a blog post
        restricted to admin
    -delete: delete a blog post
        restricted to admin

#### api/blog/:id/comment

    -get: get all comments associated with a blog post
    -post: create a new comment associated with a blog post

#### api/blog/:id/comment/:id

    -get: get a specific comment
    -patch: edit a comment
        restricted to the original creator of the comment or an admin
    -delete:
        restricted to the orignial creator of the comment or an admin

## Models needed

### user

    - id
    - username
    - password
    - accessLevel // are they an admin or user
    - email
    - signUpDate
    - standing // do they have any strikes against their account

### recipe

    - id
    - cuisineType
    - prepTime
    - cookTime
    - servings
    - ingredients
    - instructions
    - title
    - author
    - average rating
    - tags

### blog

    - id
    - author
    - text
    - publishDate
    - title
    - coverImg
    - tags

### comment

    - id
    - post
    - author
    - text
    - publishDate
    - parentComment
    - hidden

### rating

    -userID
    -recipeID
    -rating
