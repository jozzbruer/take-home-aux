from fastapi import FastAPI, Query
import json
from fastapi.middleware.cors import CORSMiddleware

from models import Posts

app = FastAPI()

# Define allowed origins
# Replace * with specific origins if needed
origins = ["*"]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

DATABASE_FILE = 'data.json'

@app.get('/posts')
async def get_posts(page: int = Query(1, description="Page number", gt=0),
                    page_size: int = Query(10, description="Number of items per page", gt=0, le=100)):
    data = read_file(DATABASE_FILE)
    
    # Calculate pagination parameters
    total_items = len(data)
    total_pages = (total_items + page_size - 1) // page_size
    start_index = (page - 1) * page_size
    end_index = min(start_index + page_size, total_items)

    # Get paginated data
    paginated_data = data[start_index:end_index]

    return {
        "page": page,
        "page_size": page_size,
        "total_pages": total_pages,
        "total_items": total_items,
        "data": paginated_data
    }


def read_file (file_path):
    with open(file_path,'r') as file:
        data = json.load(file)
    return data