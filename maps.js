let map;
let userLocation = { lat: 17.09, lng: 82.07 }; // Default user location (Surampalem)
let userMarker = null;
let providers = [];
let providerMarkers = [];
let selectedServiceId = "Plumber"; // Default service ID

const provs = [
    {
        id: "Plumber",    
        providersData: [
            {
                id: 1,   
                name: "Rajesh Kumar",
                service: "plumber",
                lat: 0,
                lng: 0,
                rating: 4.8,   
                reviews: 156,  
                phone: "+91-9876543210",
                experience: "8 years",
                availability: "available",
                hourlyRate: "₹300/hr",
                specialties: ["Pipe Repair", "Bathroom Fitting", "Water Heater Installation"],
                distanceKm: 2,
                address: "101, Main Road, Surampalem",
                contactEmail: "rajesh.plumbing@example.com",
                bookedMe: [],
                customerReviews: [
                    { name: "Priya S.", text: "Rajesh did an excellent job fixing our leaking pipe. Very professional!", rating: 5 },
                    { name: "Anil K.", text: "Quick and efficient service. Highly recommend for any plumbing needs.", rating: 4.5 },
                    { name: "Sneha R.", text: "He was very polite and explained everything clearly. Good value for money.", rating: 5 },
                ],
            },
            {
                id: 2,
                name: "Shyam Lal",
                service: "plumber",
                lat: 0,
                lng: 0,
                rating: 4.6,
                reviews: 203,
                phone: "+91-9876543211",
                experience: "12 years",
                availability: "available",
                hourlyRate: "₹400/hr",
                specialties: ["Drain Cleaning", "Leak Detection", "Geyser Repair"],
                distanceKm: 4,
                address: "B-205, Green Park, Surampalem",   
                contactEmail: "shyam.plumber@example.com",
                bookedMe: [],
                customerReviews: [
                    { name: "Rahul M.", text: "Shyam Lal is highly experienced. Solved our complex drain issue quickly.", rating: 5 },
                    { name: "Divya P.", text: "Reliable and fair pricing. Would call again for sure.", rating: 4 },
                    { name: "Vijay C.", text: "Found the hidden leak that others missed. Very satisfied.", rating: 4.5 },
                ],
            },
        ],
    },
    {
        id: "Car Mechanic",
        providersData: [
            {
                id: 1,
                name: "Suresh Kumar",
                service: "mechanic",
                lat: 0,
                lng: 0,
                rating: 4.8,
                reviews: 156,
                phone: "+91-9876543210",
                experience: "8 years",
                availability: "available",
                hourlyRate: "₹300/hr",
                specialties: ["Engine Repair", "Brake Service", "Oil Change"],
                distanceKm: 2,
                address: "101, Main Road, Surampalem",
                contactEmail: "suresh.mechanic@example.com",
                bookedMe: [],
                customerReviews: [
                    { name: "Priya S.", text: "Suresh did an excellent job fixing my car engine. Very professional!", rating: 5 },
                    { name: "Anil K.", text: "Quick and efficient car service. Highly recommend for any mechanic needs.", rating: 4.5 },
                    { name: "Sneha R.", text: "He was very polite and explained everything clearly. Good value for money.", rating: 5 },
                ],
            },
            { 
                id: 2,
                name: "Tarun Lal",
                service: "mechanic",
                lat: 0,
                lng: 0,
                rating: 4.6,
                reviews: 203,
                phone: "+91-9876543211",
                experience: "12 years",
                availability: "available",
                hourlyRate: "₹400/hr",
                specialties: ["Tyre Puncture", "Battery Check", "AC Repair"],
                distanceKm: 4,
                address: "B-205, Green Park, Surampalem",
                contactEmail: "tarun.mechanic@example.com",
                bookedMe: [],
                customerReviews: [
                    { name: "Rahul M.", text: "Tarun Lal is highly experienced. Solved our complex car issue quickly.", rating: 5 },
                    { name: "Divya P.", text: "Reliable and fair pricing. Would call again for sure.", rating: 4 },
                    { name: "Vijay C.", text: "Found the hidden car issue that others missed. Very satisfied.", rating: 4.5 },
                ],
            },
        ],
    },
];

let initialProvidersData = provs.find(category => category.id === "Plumber")?.providersData || [];
let currentProviderId = null;

localStorage.setItem("serviceProvidersData", JSON.stringify(provs));

const providerDetailsModal = document.getElementById("providerDetailsModal");
const closeButton = document.querySelector(".close-button");
const modalProviderDetails = document.getElementById("modalProviderDetails");
const modalWorkPhotos = document.getElementById("modalWorkPhotos");
const modalCustomerReviews = document.getElementById("modalCustomerReviews");
const modalBookNowBtn = document.getElementById("modalBookNowBtn");
const providersListContainer = document.getElementById("providersList");

function initMap() {
    map = L.map("map").setView([userLocation.lat, userLocation.lng], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const storedServiceId = localStorage.getItem('selectedServiceId') || 'Plumber';
    updateService(storedServiceId);

    userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: L.divIcon({
            html: '<div style="color: #ff4500; font-size: 1.7rem;"><i class="fa-solid fa-location-dot"></i></div>',
            iconSize: [40, 40],
            className: "user-marker",
        }),
    }).addTo(map);
    userMarker.bindPopup(
        "<b> Your Location</b><br>Aditya University, Surampalem, Andhra Pradesh"
    );

    updateProvidersNearUser();
    updateDisplay();

    modalBookNowBtn.onclick = () => {
        if (currentProviderId) {
            localStorage.setItem('likedServiceProvider', currentProviderId);
            localStorage.setItem('likedServiceId', selectedServiceId); // Store service ID
            window.location.href = '/booking.html';
        } else {
            alert("No provider selected for booking.");
        }
    };
}

function updateProvidersNearUser() {
    if (!userLocation) return;
    const R = 6371;

    providers.forEach((provider) => {
        const distance = provider.distanceKm;
        const bearing = Math.random() * 360;
        const latRad = (userLocation.lat * Math.PI) / 180;
        const lngRad = (userLocation.lng * Math.PI) / 180;
        const bearingRad = (bearing * Math.PI) / 180;

        const newLatRad = Math.asin(
            Math.sin(latRad) * Math.cos(distance / R) +
            Math.cos(latRad) * Math.sin(distance / R) * Math.cos(bearingRad)
        );

        const newLngRad =
            lngRad +
            Math.atan2(
                Math.sin(bearingRad) * Math.sin(distance / R) * Math.cos(latRad),
                Math.cos(distance / R) - Math.sin(latRad) * Math.sin(newLatRad)
            );

        provider.lat = (newLatRad * 180) / Math.PI;
        provider.lng = (newLngRad * 180) / Math.PI;
    });
}

function updateDisplay() {
    displayProvidersOnMap();
    updateProvidersList();
}

function displayProvidersOnMap() {
    providerMarkers.forEach((marker) => map.removeLayer(marker));
    providerMarkers = [];

    const filteredProviders = getFilteredProviders();

    filteredProviders.forEach((provider) => {
        const availabilityColors = {
            available: "green",
            busy: "orange",
            offline: "red",
        };

        const marker = L.marker([provider.lat, provider.lng], {
            icon: L.divIcon({
                html: `<div style="color: ${
                    availabilityColors[provider.availability] || "blue"
                }; font-size: 1.8rem;"><i class="fa-solid fa-location-dot"></i></div>`,
                iconSize: [30, 30],
                className: "provider-marker",
            }),
        }).addTo(map);

        const distance = userLocation
            ? calculateDistance(
                userLocation.lat,
                userLocation.lng,
                provider.lat,
                provider.lng
            )
            : "Unknown";

        const eta = userLocation ? calculateETA(distance) : "Unknown";

        marker.bindPopup(`
                <div style="min-width: 250px;">
                    <h4>${provider.name}</h4>
                    <p><strong>Service:</strong> ${
                        provider.service.charAt(0).toUpperCase() +
                        provider.service.slice(1)
                    }</p>
                    <p><strong>Rating:</strong> <span style="color: #ffc107;"><i class="fa-solid fa-star"></i> ${
                        provider.rating
                    }</span> (${provider.reviews} reviews)</p>
                    <p><strong>Experience:</strong> ${provider.experience}</p>
                    <p><strong>Rate:</strong> ${provider.hourlyRate}</p>
                    <p><strong>Distance:</strong> <i class="fa-solid fa-location-dot"></i> ${distance} away • <strong>ETA:</strong> <i class="fa-solid fa-clock"></i> ${eta} arrival time</p>
                    <p><strong>Status:</strong> <span class="availability-badge ${
                        provider.availability
                    }">${provider.availability.toUpperCase()}</span></p>
                </div>
            `);

        providerMarkers.push(marker);
    });
}

function getFilteredProviders() {
    return providers;
}

function updateProvidersList() {
    const listDiv = document.getElementById("providersList");
    const filteredProviders = getFilteredProviders();

    if (filteredProviders.length === 0) {
        listDiv.innerHTML =
            '<div class="loading">No professionals found in your area for this service.</div>';
        return;
    }

    let html = "";
    filteredProviders.forEach((provider) => {
        const distance = userLocation
            ? calculateDistance(
                userLocation.lat,
                userLocation.lng,
                provider.lat,
                provider.lng
            )
            : "Distance unknown";

        const eta = userLocation ? calculateETA(distance) : "Unknown";

        html += `
                <div class="provider-card">
                    <div class="provider-header">
                        <div class="provider-name">${provider.name}</div>
                        <div class="availability-badge ${
                            provider.availability
                        }">${provider.availability.toUpperCase()}</div>
                    </div>

                    <div class="provider-info">
                        <strong>${
                            provider.service.charAt(0).toUpperCase() +
                            provider.service.slice(1)
                        }</strong> • ${provider.experience} experience<br>
                        <strong>Rate:</strong> ${provider.hourlyRate}
                    </div>

                    <div class="rating-section">
                        <span class="stars"><i class="fa-solid fa-star"></i> ${
                            provider.rating
                        }</span>
                        <span>(${provider.reviews} reviews)</span>
                    </div>

                    <div class="provider-info">
                        <strong>Specialties:</strong> ${provider.specialties.join(
                            ", "
                        )}
                    </div>

                    <div class="distance-time">
                        <i class="fa-solid fa-location-dot"></i> ${distance} away • <strong>ETA:</strong> <i class="fa-solid fa-clock"></i> ${eta} arrival time
                    </div>

                    <div class="action-buttons">
                        <button class="btn btn-small btn-details" data-provider-id="${
                            provider.id
                        }" data-service-id="${selectedServiceId}">View Full Details</button>
                    </div>
                </div>
            `;
    });

    listDiv.innerHTML = html;

    document.querySelectorAll(".btn-details").forEach((button) => {
        button.addEventListener("click", function () {
            const providerId = parseInt(this.dataset.providerId);
            const serviceId = this.dataset.serviceId;
            viewFullDetails(serviceId, providerId);
        });
    });
}

function viewFullDetails(serviceId, providerId) {
    let providerFound = null;

    const serviceCategory = provs.find(category => category.id === serviceId);

    if (serviceCategory) {
        providerFound = serviceCategory.providersData.find(p => p.id === providerId);
    }
    
    if (providerFound) {
        currentProviderId = providerFound.id;
        currentServiceId = serviceCategory.id;

        let detailsHtml = `
            <p><strong>Name:</strong> ${providerFound.name}</p>
            <p><strong>Service:</strong> ${
                providerFound.service.charAt(0).toUpperCase() +
                providerFound.service.slice(1)
            }</p>
            <p><strong>Address:</strong> ${providerFound.address}</p>
            <p><strong>Contact:</strong> ${providerFound.phone} | ${
                providerFound.contactEmail
            }</p>
            <p><strong>Experience:</strong> ${providerFound.experience}</p>
            <p><strong>Hourly Rate:</strong> ${providerFound.hourlyRate}</p>
            <p><strong>Specialties:</strong> ${providerFound.specialties.join(
                ", "
            )}</p>
            <p><strong>Availability:</strong> <span class="availability-badge ${
                providerFound.availability
            }">${providerFound.availability.toUpperCase()}</span></p>
        `;
        modalProviderDetails.innerHTML = detailsHtml;

        let photosHtml = "";
        if (providerFound.workPhotos && providerFound.workPhotos.length > 0) {
            providerFound.workPhotos.forEach((photoUrl) => {
                photosHtml += `<img src="${photoUrl}" alt="Work Photo for ${providerFound.name}">`;
            });
        } else {
            photosHtml = "<p>No work photos available.</p>";
        }
        modalWorkPhotos.innerHTML = photosHtml;

        displayCustomerReviews(providerFound);

        providerDetailsModal.style.display = "flex";
    } else {
        alert("Provider details not found.");
    }
}

function displayCustomerReviews(provider) {
    let reviewsHtml = "";
    if (provider.customerReviews && provider.customerReviews.length > 0) {
        const sortedReviews = [...provider.customerReviews].reverse();
        sortedReviews.forEach((review) => {
            reviewsHtml += `
                        <div class="review-item">
                            <p class="review-text">"${review.text}"</p>
                            <p class="reviewer-name">- ${review.name} (${review.rating} <i class="fa-solid fa-star"></i>)</p>
                        </div>
                    `;
        });
    } else {
        reviewsHtml = "<p>No reviews yet. Be the first to review!</p>";
    }
    modalCustomerReviews.innerHTML = reviewsHtml;
}

closeButton.addEventListener("click", function () {
    providerDetailsModal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == providerDetailsModal) {
        providerDetailsModal.style.display = "none";
    }
});

function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance < 1
        ? `${Math.round(distance * 1000)}m`
        : `${distance.toFixed(1)}km`;
}

function calculateETA(distanceStr) {
    const distance = parseFloat(distanceStr);
    if (isNaN(distance)) return "Unknown";

    const timeInHours = distance / 30;
    const timeInMinutes = Math.round(timeInHours * 60);

    if (timeInMinutes < 60) {
        return `${timeInMinutes} mins`;
    } else {
        const hours = Math.floor(timeInMinutes / 60);
        const mins = timeInMinutes % 60;
        return `${hours}h ${mins}m`;
    }
}

function updateService(serviceId) {
    const serviceCategory = provs.find(category => category.id === serviceId);
    if (serviceCategory) {
        providers = serviceCategory.providersData;
        updateProvidersNearUser();
        updateDisplay();
        document.getElementById("locationStatus").innerHTML = `<i class="fa-solid fa-circle-check"></i> Location set to Surampalem, Andhra Pradesh. Showing ${serviceId}.`;
        document.querySelector("h3").innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> Available ${serviceId}s`;
    } else {
        alert("Service not found.");
    }
}

window.onload = function () {
    initMap();
    document.querySelectorAll('.nav-link-dynamic').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const serviceId = this.getAttribute('data-service-id');
            localStorage.setItem('selectedServiceId', serviceId);
            updateService(serviceId);
        });
    });
    document.querySelectorAll('.sidebar-link-dynamic').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const serviceId = this.getAttribute('data-service-id');
            localStorage.setItem('selectedServiceId', serviceId);
            updateService(serviceId);
            closeMenu();
        });
    });
};

function openMenu() {
    document.getElementById('sidebar').style.display = 'flex';
}

function closeMenu() {
    document.getElementById('sidebar').style.display = 'none';
}





