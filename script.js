// Массив мероприятий
const eventsStore = [
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    description: "Being an INFJ",
    date: new Date(2024, 2, 23, 15),
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w",
    type: "offline",
    attendees: 99,
    category: "Hobbies and Passions",
    distance: 50,
  },
  {
    title: "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
    description: "New York AI Users",
    date: new Date(2024, 2, 23, 11, 30),
    image: "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    attendees: 43,
    category: "Technology",
    distance: 25,
  },
  {
    title: "Book 40+ Appointments Per Month Using AI and Automation",
    description: "New Jersey Business Network",
    date: new Date(2024, 2, 16, 14),
    image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 25,
    category: "Technology",
    distance: 10,
  },
  {
    title: "Dump writing group weekly meetup",
    description: "Dump writing group",
    date: new Date(2024, 2, 13, 11),
    image: "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 77,
    category: "Business",
    distance: 100,
  },
  {
    title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
    description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
    date: new Date(2024, 2, 14, 11),
    image: "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 140,
    category: "Social Activities",
    distance: 75,
  },
  {
    title: "All Nations - Manhattan Missions Church Bible Study",
    description: "Manhattan Bible Study Meetup Group",
    date: new Date(2024, 2, 14, 11),
    image: "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    attendees: 35,
    category: "Health and Wellbeing",
    distance: 15,
  },
];

// Получаем элементы из DOM
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
const categoryFilter = document.getElementById('categoryFilter');
const typeFilter = document.getElementById('typeFilter');
const distanceFilter = document.getElementById('distanceFilter');
const dateFilter = document.getElementById('dateFilter');
const eventsContainer = document.getElementById('eventsContainer');

// Функция для отображения мероприятий
function renderEvents(events) {
  eventsContainer.innerHTML = ''; // Очистка контейнера

  events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');

    eventCard.innerHTML = `
      <img src="${event.image}" alt="${event.title}" class="event-card-image">
      <div class="event-card-content">
        <div class="event-title">${event.title}</div>
        <div class="event-details">
          <div>Category: ${event.category}</div>
          <div>Distance: ${event.distance} km</div>
          <div>Date: ${event.date.toLocaleDateString()} ${event.date.toLocaleTimeString()}</div>
          <div>Attendees: ${event.attendees}</div>
        </div>
      </div>
    `;
    eventsContainer.appendChild(eventCard);
  });
}

// Функция для фильтрации мероприятий
function filterEvents() {
  const categoryValue = categoryFilter.value;
  const typeValue = typeFilter.value;
  const distanceValue = parseInt(distanceFilter.value, 10);
  const dateValue = dateFilter.value;

  const filteredEvents = eventsStore.filter(event => {
    const matchesCategory = categoryValue ? event.category === categoryValue : true;
    const matchesType = typeValue ? event.type === typeValue : true;
    const matchesDistance = distanceValue ? event.distance <= distanceValue : true;
    const matchesDate = dateValue
      ? (() => {
          // Получаем только дату без времени из события и фильтра
          const eventDate = event.date.toISOString().split('T')[0];
          const selectedDate = dateValue.split('T')[0];
          return eventDate === selectedDate;
        })()
      : true;

    return matchesCategory && matchesType && matchesDistance && matchesDate;
  });

  renderEvents(filteredEvents);
}

// Сброс фильтров
resetFiltersBtn.addEventListener('click', () => {
  categoryFilter.value = '';
  typeFilter.value = '';
  distanceFilter.value = '';
  dateFilter.value = '';
  renderEvents(eventsStore);
});

// Слушатели на изменение фильтров
categoryFilter.addEventListener('change', filterEvents);
typeFilter.addEventListener('change', filterEvents);
distanceFilter.addEventListener('change', filterEvents);
dateFilter.addEventListener('change', filterEvents);

// Отображение всех мероприятий при загрузке
renderEvents(eventsStore);