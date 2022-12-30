import React from 'react';
import './App.css';
import Menu from './Menu';
import List from './List';

class App extends React.Component{

  constructor(props){
    super(props);

    this.state={
      books: [
        {id:0, rating:5, title: 'Los Juegos del Hambre', image: 'Libro1.jpg'},
        {id:1, rating:4, title: 'Una chica llamada Lil', image: 'Libro2.jpg'},
        {id:2, rating:3, title: 'Relatos de un Naufrago', image: 'Libro3.jpg'},
        {id:3, rating:2, title: 'La Voragine', image: 'Libro4.jpg'},
        {id:4, rating:5, title: 'Super Cerebro', image: 'Libro5.jpg'},
        {id:5, rating:4, title: 'Cuentos de los hermanos Grim', image: 'Libro6.jpg'},
        {id:6, rating:3, title: 'Las mil y una noches', image: 'Libro7.jpg'},
        {id:7, rating:5, title: 'El Principito', image: 'Libro8.jpg'}
      ],

      copyBooks: []

    };

    this.onSearch = this.onSearch.bind(this);
    this.addItem = this.addItem.bind(this);
    this.remove = this.remove.bind(this);
    this.updateRating = this.updateRating.bind(this);
  }

  initBooks(){
    //this.setState({copyBooks: [...this.state.books]});
    this.setState((state,props) => ({
      copyBooks: [...state.books]
    }));
  }

  componentDidMount(){
    this.initBooks();
  }

  onSearch(query){
    if(query === ''){
      this.setState({copyBooks: [...this.state.books]});
    }else{

      const temp = [...this.state.books];
      var res = [];
      temp.forEach(item =>{
        if(item.title.toLowerCase().indexOf(query) > -1){
          res.push(item);
        }
      });
    
      this.setState({copyBooks: [...res]});
    }
  }

  addItem(item){
    var temp = [...this.state.books
    ];
    const id = temp[temp.length-1
    ].id + 1;
    item['id'
  ] = id;
    temp.push(item);
    this.setState({books: [...temp
    ]
  }
  );
    this.initBooks();
  }

  remove(id){
    var temp = [...this.state.books
    ];
    const res = temp.filter(item => item.id != id);
    this.setState({books: [...res]});
    this.initBooks();
  }

  updateRating(item){
    var temp = [...this.state.books
    ];
    const index = temp.findIndex(x => x.id === item.id);
    temp[index].title = item.title;
    temp[index].image = item.image;
    temp[index].rating = item.rating;

    this.setState({books: [...temp]});
    this.initBooks();
  }

  render(){
    return (
      <div className="app">
        <Menu title="FindBook" onsearch={this.onSearch} onadd={this.addItem} />
        <List className="list" items={this.state.copyBooks} onremove={this.remove} onupdaterating={this.updateRating} />
    </div>
    );
  }
}

export default App;
