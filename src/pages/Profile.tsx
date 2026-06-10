import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const Profile = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Account</p>
          <h2 className="dashboard-title">Profile</h2>
          <p className="dashboard-subtitle">
            A lightweight profile shell for managing your account details and future settings.
          </p>
        </div>
      </div>

      <div className="grid">
        <div className="col-12 lg:col-4">
          <Card className="dashboard-panel profile-summary-card">
            <div className="profile-avatar-large">MM</div>
            <h3 className="profile-name">Money Manager User</h3>
            <p className="profile-email">Signed in securely with your current session.</p>
            <div className="profile-stat-grid">
              <div>
                <span>Role</span>
                <strong>User</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>Active</strong>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12 lg:col-8">
          <Card title="Profile details" className="dashboard-panel">
            <div className="flex flex-column gap-3">
              <div className="flex flex-column gap-2">
                <label htmlFor="profileName">Display name</label>
                <InputText id="profileName" value="Money Manager User" readOnly />
              </div>
              <div className="flex flex-column gap-2">
                <label htmlFor="profileEmail">Email address</label>
                <InputText id="profileEmail" value="account@money-manager.app" readOnly />
              </div>
              <div className="flex justify-content-end">
                <Button label="Save changes" icon="pi pi-check" disabled />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
