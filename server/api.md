API Documentation: 

GET /products
### Query Parameters:

- **limit**: (optional) 
  - Type: number
  - Default: 10
  - Description: Number of products to return per page (minimum 1, maximum 100).

- **offset**: (optional)
  - Type: number
  - Default: 0
  - Description: Number of products to skip for pagination.

- **sort**: (optional)
  - Type: string
  - Description: Sorting method in the format "<field>_<asc|desc>".
    - Example: `price_asc` for ascending price, `created_at_desc` for descending creation date.

- **name**: (optional)
  - Type: string
  - Description: Search term to match product names or categories (case-insensitive partial match).
  
- **category**: (optional)
  - Type: string
  - Description: Exact case-sensitive category filter. Only products matching the exact category name will be returned.



