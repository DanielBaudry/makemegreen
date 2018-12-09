import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import withLogin from "../hocs/withLogin"
import NavBar from "../items/NavBar";

class ProfilePage extends Component {

    render () {

        return(
            <div className="text-center">

                <NavBar />

                <div className="title-header">
                    <h5>Mon profil</h5>
                </div>

                <div className="content">
                    <div>
                        <p>Inclusive capitalism shift donors revitalize celebrate; hack elevate Kony 2012 shifting landscape generosity. Emergent relief economic independence volunteer informal economies life-saving visionary, growth equality community immunize civic engagement. Crisis management forward-thinking, focus on impact giving, policy healthcare solve; cornerstone time of extraordinary change human experience making progress. Advocate catalyze, affordable health care, outcomes justice invest. Care; citizens of change compassion solution, gender equality accelerate social worker equity donation foster. Challenges of our times working alongside UNHCR Oxfam global health country enable medical impact achieve. Long-term, UNICEF beneficiaries honesty, meaningful work combat malaria, foundation; urban disrupt liberal catalyst effectiveness.</p>
                    </div>

                    <div>
                        <p>Network working families, Aga Khan, collaborative consumption plumpy'nut end hunger poverty readiness legitimize proper resources social good humanitarian relief medical supplies. Protect, future expanding community ownership, citizenry innovate metrics. Provide action public-private partnerships Medecins du Monde collaborative cities board of directors humanitarian agriculture aid progressive assessment expert conflict resolution cooperation. Economic development, economic security pathway to a better life public service results human-centered design necessities. Women and children; The Elders institutions interconnectivity; small-scale farmers public institutions change-makers participatory monitoring organization grantees detection local solutions underprivileged raise awareness. Carbon rights recognize potential; save the world courageous sustainability assistance vulnerable citizens. Theory of social change evolution, Millennium Development Goals, youth democratizing the global financial system initiative legal aid sanitation our grantees and partners lifting people up.</p>
                    </div>

                    <div>
                        <p>Cross-cultural, global leaders equal opportunity social, social movement insurmountable challenges breakthrough insights honor. Jane Jacobs leverage; nonprofit free-speech, our ambitions, disruption enabler 501(c)(3). Accessibility world problem solving, partner diversity Cesar Chavez billionaire philanthropy improving quality refugee benefit democracy natural resources. Crowdsourcing, policymakers; harness, peace respect partnership Andrew Carnegie inclusive. Human potential Kickstarter resourceful lasting change process respond.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(ProfilePage)