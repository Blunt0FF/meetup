const eventsStore = [
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    group: "Being an INFJ",
    date: new Date(2024, 2, 23, 15),
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop",
    type: "offline",
    attendees: 99,
    category: "Hobbies and Passions",
    distance: 50,
  },
  {
    title: "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
    group: "New York AI Users",
    date: new Date(2024, 2, 23, 11, 30),
    image: "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop",
    type: "offline",
    attendees: 43,
    category: "Technology",
    distance: 25,
  },
  {
    title: "Book 40+ Appointments Per Month Using AI and Automation",
    group: "New Jersey Business Network",
    date: new Date(2024, 2, 16, 14),
    image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop",
    type: "online",
    attendees: 25,
    category: "Technology",
    distance: 10,
  },
  {
    title: "Dump writing group weekly meetup",
    group: "Dump writing group",
    date: new Date(2024, 2, 13, 11),
    image: "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop",
    type: "online",
    attendees: 77,
    category: "Business",
    distance: 100,
  },
  {
    title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
    group: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
    date: new Date(2024, 2, 14, 11),
    image: "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop",
    type: "online",
    attendees: 140,
    category: "Social Activities",
    distance: 75,
  },
  {
    title: "All Nations - Manhattan Missions Church Bible Study",
    group: "Manhattan Bible Study Meetup Group",
    date: new Date(2024, 2, 14, 11),
    image: "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop",
    type: "offline",
    attendees: 35,
    category: "Health and Wellbeing",
    distance: 15,
  },
];

const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const categoryFilter = document.getElementById("categoryFilter");
const typeFilter = document.getElementById("typeFilter");
const distanceFilter = document.getElementById("distanceFilter");
const dateFilter = document.getElementById("dateFilter");
const eventsContainer = document.getElementById("eventsContainer");

const dateFormat = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" });
const timeFormat = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });

// Local calendar day, so filtering doesn't shift across the UTC boundary.
function dateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function fillDateOptions() {
  const days = new Map();
  eventsStore.forEach((event) => {
    const key = dateKey(event.date);
    if (!days.has(key)) days.set(key, event.date);
  });

  [...days.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([key, date]) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = dateFormat.format(date);
      dateFilter.appendChild(option);
    });
}

function renderEvents(events) {
  eventsContainer.innerHTML = "";

  if (events.length === 0) {
    const empty = document.createElement("p");
    empty.className = "events-empty";
    empty.textContent = "No events match these filters.";
    eventsContainer.appendChild(empty);
    return;
  }

  [...events]
    .sort((a, b) => a.date - b.date)
    .forEach((event) => {
      const card = document.createElement("article");
      card.className = "event-card";
      card.innerHTML = `
        <img src="${event.image}" alt="" loading="lazy">
        <div class="event-card-content">
          <span class="event-badge">${event.type}</span>
          <h3 class="event-title"></h3>
          <p class="event-group"></p>
          <div class="event-details">
            <div>${dateFormat.format(event.date)} · ${timeFormat.format(event.date)}</div>
            <div>${event.category} · ${event.distance} km</div>
            <div>${event.attendees} going</div>
          </div>
        </div>
      `;
      card.querySelector(".event-title").textContent = event.title;
      card.querySelector(".event-group").textContent = event.group;
      eventsContainer.appendChild(card);
    });
}

function filterEvents() {
  const categoryValue = categoryFilter.value;
  const typeValue = typeFilter.value;
  const distanceValue = parseInt(distanceFilter.value, 10);
  const dateValue = dateFilter.value;

  const filteredEvents = eventsStore.filter((event) => {
    const matchesCategory = categoryValue ? event.category === categoryValue : true;
    const matchesType = typeValue ? event.type === typeValue : true;
    const matchesDistance = distanceValue ? event.distance <= distanceValue : true;
    const matchesDate = dateValue ? dateKey(event.date) === dateValue : true;
    return matchesCategory && matchesType && matchesDistance && matchesDate;
  });

  renderEvents(filteredEvents);
}

resetFiltersBtn.addEventListener("click", () => {
  categoryFilter.value = "";
  typeFilter.value = "";
  distanceFilter.value = "";
  dateFilter.value = "";
  renderEvents(eventsStore);
});

[categoryFilter, typeFilter, distanceFilter, dateFilter].forEach((filter) => {
  filter.addEventListener("change", filterEvents);
});

fillDateOptions();
renderEvents(eventsStore);
