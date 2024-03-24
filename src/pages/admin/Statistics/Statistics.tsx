import Chart from './components/Chart/Chart';
import TopCompany from './components/TopCompany/TopCompany';
import TopJob from './components/TopJob/TopJob';
import Total from './components/Total/Total';

function Statistics() {
    return (
        <div className="flex flex-col gap-8 pb-10">
            <Total />

            <div className="flex justify-between gap-4">
                <Chart />
                <TopJob />
            </div>

            <TopCompany />
        </div>
    );
}

export default Statistics;
