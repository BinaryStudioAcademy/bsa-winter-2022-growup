const Ork: React.FC = () => (
    <div className="container p-4">
        <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-my-tab" data-bs-toggle="tab"
                data-bs-target="#nav-my" type="button" role="tab" aria-controls="nav-my"
                aria-selected="true">My OKR</button>

                <button className="nav-link" id="nav-all-tab" data-bs-toggle="tab"
                data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all"
                aria-selected="false">All OKRs</button>
            </div>
        </nav>
        <div className="tab-container" id="nav-tabContent">
            <div className="tab-pane fade show active p-3" id="nav-my" role="tabpanel"
            aria-labelledby="nav-my-tab">
            </div>
            <div className="tab-pane fade active p-3" id="nav-all" role="tabpanel"
            aria-labelledby="nav-all-tab">
            </div>
        </div>
    </div>
);

export default Ork;
