# Behind The Scenes - Episodes

## Структура

Сторінка "Behind The Scenes" містить розділ Episodes з можливістю:
- Перегляду списку епізодів
- Створення нового епізоду через модалку
- Редагування епізоду
- Перегляду деталей епізоду
- Видалення епізоду

## API Endpoints

### GET /api/admin/episodes
Отримати список всіх епізодів

### POST /api/admin/episodes
Створити новий епізод

**Request Body:**
```json
{
  "name": "FROM 0 TO 1K: building the first community members",
  "description": "What happens when you launch your idea into the world — we break down doubts and how we attracted our first 1,000 users.",
  "imageUrl": "https://cdn.example.com/episodes/cover-1.jpg",
  "links": [
    {
      "platform": "youtube",
      "url": "https://www.youtube.com/watch?v=abcdef"
    }
  ]
}
```

### GET /api/admin/episodes/:id
Отримати деталі епізоду

### PUT /api/admin/episodes/:id
Оновити епізод

### DELETE /api/admin/episodes/:id
Видалити епізод

## Компоненти

- `BehindTheScenesList.tsx` - Головна сторінка з розділом Episodes та модалкою для створення
- `episodes/show.tsx` - Сторінка перегляду деталей епізоду
- `episodes/edit.tsx` - Сторінка редагування епізоду

## Особливості

- Модалка для створення епізоду відкривається на головній сторінці
- Можливість додавати кілька відео-лінків з різних платформ (YouTube, Vimeo, Other)
- Стилізація адаптована під темний та світлий режими

