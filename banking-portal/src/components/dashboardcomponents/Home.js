import React, { Component } from 'react'
import { Card, ListGroup, Accordion } from 'react-bootstrap'
import "../../styles/Dashboard.css"
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
class Home extends Component {
    componentWillReceiveProps(nextProps) {
        this.setState({props:nextProps})
        // if (nextProps.UI.errors) {
        //   this.setState({ errors: nextProps.UI.errors });
        // }
      };


    

    render(){
        const {
            user: {
              accounts,
              email
            }
        } = this.props;
        let accountData;
        if(accounts){
            accountData = accounts.map((account,index)=>{
                return (
                    <Card.Body>
                        <Card.Title>{account.AccountID}</Card.Title>
                        <Card.Text>
                        ${parseFloat(account.AccountBalance).toFixed(2)}
                        </Card.Text>
                    </Card.Body>
                    )
                    })
        }
    return (
        //Home component with 3 cards
        //One header and two content cards

      <div className="Content">
          <Card className="Tile">
              <Card.Body className="TileHead">
                <h2>Home</h2>
              </Card.Body>
          </Card>

          <Card className="Tile">
            <Card.Body className="TileBody">
                <h3>Bank Accounts</h3>
                    <Card>
                    <Card.Header>Checking Accounts</Card.Header>
                        {accountData}
                    </Card>
            </Card.Body>
          </Card>

          <Card className="Tile">
              <Card.Body className="TileBody">
                  <h3>Asset Summary</h3>
              </Card.Body>
          </Card>
      </div>  
    );
}
}


const mapStateToProps = (state) => ({
    user: state.user
  });



  Home.propTypes = {
    user: PropTypes.object.isRequired,
  };

export default connect(mapStateToProps)(Home);
