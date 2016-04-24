var React = require('react');
var PostStore = require('../PostStore');
var actions = require('../actions');

var FrontpageSidebar = require('./FrontpageSidebar');

var About = React.createClass({
    render: function() {
        return (
            <div id="about-wrapper">
            	<div id="content-block-posts" className="col-md-12">
            	<h1>Om Radio Revolt</h1>

            	<p>Radio Revolt er en ikke-kommersiell studentdrevet radiokanal som gir deg det nyeste innen musikk, underholdning og studentnyheter fra Trondheim. Kanalen sender nytt innhold hver dag og sammarbeider også mye med studentavisa Under Dusken. Radio Revolts mål er å være et alternativt tilbud, ikke bare til studenter, men til alle som vil høre radio laget av studenter. Vi har en utfordrende musikkprofil, med intervjuer av aktuelle artister og spilling av mange lokale band.</p>

            	<h2>Historie</h2>

            	<p>Studentradio'n i Trondheim ble stiftet 17. november 1984, men forløperne til dagens Studentradio går mye lenger tilbake. Allerede i 1929 ble Akademisk Radioklubb (ARK) startet opp ved Studentersamfundet, og under UKA i 1933 ble det for første gang eksperimentert med radiosendinger &ndash; kjent som UKEsenderen.</p>

            	<p>UKEsenderen ble raskt en tradisjon, og ble satt i drift ved hver UKE siden – kun med unntak av UKA77 og UKA79, da departementet nektet å gi dispensasjon fra NRK-monopolet.</p>

            	<p>16. desember 1981 ble det vedtatt å oppheve NRKs monopol på radiosendinger i Norge, og det ble blant annet åpnet for drift av nærradiokanaler. Miljøet rundt  UKEsenderen 81 ønsket umiddelbart å søke om konsesjon, men på grunn av forsinkelser skulle det ta to år før en konsesjonssøknad kom igjennom.</p>

            	<p>I 1984 fikk Studentersamfundet i Trondhjem konsesjon for drift av nærradio, og de første sendingene ble gjennomført samme høst i forbindelse med Studentersamfundets Internet Teaters (SIT) oppføring av stykket ”Bare plastikk”. En av ildsjelene i forarbeidet var Lars Steinar Hanssen, og han ble utnevnt til redaktør 1. september. Imidlertid var det ennå ikke bestemt om Samfundet skulle fortsette å satse på radiosendinger. 17. november bestemte Storsalen at Rådet skulle ”utarbeide midlertidige statutter for nærradiodrift, samt oppnevne en gruppe som kan stå for prøvedrift”. I første omgang tok man sikte på en seksmåneders prøveperiode, men Finansstyret vedtok å utvide denne til å gjelde ut 1985.</p>

            	<p>I 1985 sendte Studentradion 3 dager i uken, fra samme studio som UKEsenderen. Redaksjonen bestod av åtte faste medlemmer, og en del løsere tilknyttede medarbeidere. Samfundets Forsterkerkomité stilte med teknisk ekspertise. Akademsik RadioKlubb (ARK) var ikke lenger involvert, fordi sendingene gikk via Televerkets sender på Tyholt. Våren 1985 ble det første semesteret med sammenhengende sendinger fra Studentradion i Trondheim.</p>

            	<p>De neste fem årene ble Studentradions eksistens diskutert gjentatte ganger i Storsalen, før man i 1988 besluttet at Studentersamfundet i Trondhjem, i samarbeid med Studentsamskipnaden i Trondheim, skulle opprette selskapet Mediastud AS. I dette selskapet skulle Samfundet og Samskipnaden eie 50% hver, en deling som fortsatt står uforandret. Mediastud fikk også ansvaret for studentavisen Under Dusken. Samme år fikk Studentradion også nytt studio i toppen av Studentersamfundet, et prosjekt som hovedsakelig var finansiert av samskipnaden.</p>

            	<p>I 2009 endret studentradioen navn til Radio Revolt og flytter inn i nye lokaler med nytt studio, igjen finansiert av SiT. Vi fikk opprinnelig konsesjon for 24-timers sendinger på FM, men <a href="http://www.adressa.no\/kultur\/article1401540.ece">mistet denne</a> samme år etter mye strid. Etter dette ble sendetiden stadig redusert, og vi ble endelig tatt av FM i 2014.</p>

            	<p>I 2013 endret Mediastud AS navn til Studentmediene i Trondheim AS, som i dag er eid av Studentersamfundet og Studentsamskipnaden i Trondheim (SiT) i fellesskap, og gjengene Radio Revolt, Under Dusken og Student-TV ble slått sammen. Samme år ble også <a href="http://dusken.no">dusken.no</a> lansert, som en felles nettside for medieinnholdet fra Studentmediene.</p>

            	<p>Mellom vi ble tatt av FM i 2014 og mars 2015 sendte vi kun på nett. I 2015 ble lokal-DAB-nettet i Sør-Trøndelag lansert, og Radio Revolt var blant den første gruppen lokalkanaler som fikk konsesjon til sending på DAB.</p>
				</div>
            </div>
           );
    }
});

module.exports = About;