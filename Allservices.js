const services = [
  { label: 'Plumber Repairs', category: 'appliance', image: 'https://scoutnetworkblog.com/wp-content/uploads/2018/11/Plumber-Sink-201709-003.jpg' },
  { label: 'AC Repair & Services', category: 'appliance', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHliazFzNWoyMG5yeHlkYjR5dnF2c2phMWN4cTdqOGNuc2V1cmJ1ZiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/Y26VHuLX8RkVZh7BIh/giphy.gif' },
  { label: 'Car', category: 'vehicle', image: 'https://media.giphy.com/media/3idkNxShn9kUHgMsJt/giphy.gif' },
  { label: 'Laptop', category: 'electronics', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqQr4x1z6AyJI84nctJajALluIulWqTMKZurcbgUL_O-BNnxJjmQaqZJVryWxZUic_wRI&usqp=CAU' },
  { label: 'Mobile', category: 'electronics', image: 'https://timestech.in/wp-content/uploads/2022/07/mobile-phone-repair.jpg' },
  { label: 'Refrigerator', category: 'appliance', image: 'https://t3.ftcdn.net/jpg/02/55/57/22/360_F_255572256_oIMCf8pbQLCBydVURwejdq0iPEcbUVE9.jpg' },
  { label: 'TV', category: 'electronics', image: 'https://www.digimanthan.com/wp-content/uploads/2021/02/Digimanthan.jpg' },
  { label: 'Camera', category: 'electronics', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGFycjE3NzUxNmgyemJvOHo0MXBrZzVqNDhqbnk3aWZiODdjd2F3eiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/laXfRdPF7B8dM7ytTH/giphy.gif'},
  { label: 'Fan', category: 'other', image: 'https://i.ytimg.com/vi/CHHseuotyS0/hqdefault.jpg' },
  { label: 'Printer', category: 'electronics', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGVjNGx3NnlkYXFzcDdxZzNzajR5M3lzdW96aGd1cGw4c3RidmY1MiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/ugHLUTuQl1F77bb9dt/giphy.gif' },
  { label: 'Elevator', category: 'appliance', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1yJabr01hTLjk5SobfeHXkmyvgGC1dTIpLR5g1jMK8mbNwWJ38Pni33Hbr5ji_5XCZCU&usqp=CAU' },
  // Add more if needed
];

const grid = document.getElementById('cardGrid');    

function loadCards(category = 'all') {   
  grid.innerHTML = '';
  services.forEach(service => {
    if (category === 'all' || service.category === category) {
      const card = document.createElement('div');
      card.classList.add('card', service.category);
      card.innerHTML = `
        <div class="card-img" style="background-image: url('${service.image}');"></div>
        <div class="card-label">${service.label}</div>
      `;
      grid.appendChild(card);
    }
  });
}

function filterCards(category) {
  const buttons = document.querySelectorAll('.filter-buttons button');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  loadCards(category);
}

window.onload = () => loadCards();