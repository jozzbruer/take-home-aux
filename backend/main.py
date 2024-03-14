from fastapi import FastAPI, Query, HTTPException
import json
from fastapi.middleware.cors import CORSMiddleware

from models import Post

app = FastAPI()

# Define allowed origins
# Replace * with specific origins if needed
origins = ['*']

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allow_headers=['*'],
)

DATABASE_FILE = 'data.json'

@app.get('/posts')
async def get_posts(page: int = Query(1, description='Page number', gt=0),
                    page_size: int = Query(10, description='Number of items per page', gt=0, le=100)):
    data = read_file(DATABASE_FILE)
    
    # Calculate pagination parameters
    total_items = len(data)
    total_pages = (total_items + page_size - 1) // page_size
    start_index = (page - 1) * page_size
    end_index = min(start_index + page_size, total_items)

    # Get paginated data
    paginated_data = data[start_index:end_index]

    return {
        'page': page,
        'page_size': page_size,
        'total_pages': total_pages,
        'total_items': total_items,
        'data': paginated_data
    }


# Update Hug count and set a selected field to track user selection
@app.put('/posts/{post_url}/update_hugs')
async def update_hugs(post_url: str):
     data = read_file(DATABASE_FILE)

     post = next((p for p in data if p['post_url'] == post_url), None)
     if not post:
        raise HTTPException(status_code=404, detail='Post not found')
     
     # check if selected exist
     if 'selected' not in post:
         post['selected'] = False
     
     if not post['selected']:
         # Increment hug count by 1
        post['num_hugs'] += 1
        # Set selected field to true
        post['selected'] = True
     else:
        # Increment hug count by 1
        post['num_hugs'] -= 1
        # Set selected field to true
        post['selected'] = False


     write_to_file(DATABASE_FILE,data)  # Write updated data back to file

     return {"message": f"Post with URL '{post_url}' updated successfully."}

@app.post('posts/{post_url}/add_comment') 
# async def add_comment(post_url: str, comment: dict):
#     data = read_file(DATABASE_FILE)

#     post = next((p for p in data if p['post_url'] == post_url), None)
#     if not post:
#         raise HTTPException(status_code=404, detail='Post not found')

#     # Check if the comment key exists, if not, create it as an empty dictionary
#     if 'comments' not in post:
#         post['comments'] = {}

#     # Add the comment to the comments dictionary
#     post['comments'].update(comment)

#     # Write updated data back to file
#     write_to_file(DATABASE_FILE, data)

#     return {"message": f"Comment added to post with URL '{post_url}' successfully."}


     
def read_file (file_path):
    with open(file_path,'r') as file:
        data = json.load(file)
    return data

def write_to_file (file_path, data):
    with open(file_path,'w') as file:
        json.dump(data, file, indent=4)