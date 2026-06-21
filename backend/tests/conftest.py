import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.config import settings
from app.database import Base, get_db
from app.main import app
from app.models.application import Application
from app.models.user import User
from app.models.vehicle import Vehicle
from app.security.password import hash_password


ADMIN_EMAIL = "adminlocal@motors"
ADMIN_PASSWORD = "AdminMot1!"
USER_EMAIL = "userlocal@motors"
USER_PASSWORD = "UserMot1!"


def seed_test_database(db):
    admin = User(
        email=ADMIN_EMAIL,
        hashed_password=hash_password(ADMIN_PASSWORD),
        role="admin",
    )

    user = User(
        email=USER_EMAIL,
        hashed_password=hash_password(USER_PASSWORD),
        role="user",
    )

    vehicles = [
        Vehicle(
            brand="Peugeot",
            model="208 PureTech",
            year=2021,
            mileage=38500,
            price=13990,
            monthly_price=None,
            energy="Essence",
            transmission="Manuelle",
            mode="sale",
            status="available",
        ),
        Vehicle(
            brand="Renault",
            model="Clio E-Tech",
            year=2022,
            mileage=24500,
            price=None,
            monthly_price=289,
            energy="Hybride",
            transmission="Automatique",
            mode="rental",
            status="available",
        ),
        Vehicle(
            brand="Tesla",
            model="Model 3",
            year=2020,
            mileage=61200,
            price=27900,
            monthly_price=None,
            energy="Electrique",
            transmission="Automatique",
            mode="sale",
            status="available",
        ),
        Vehicle(
            brand="Citroen",
            model="C3 Aircross",
            year=2023,
            mileage=15300,
            price=None,
            monthly_price=319,
            energy="Diesel",
            transmission="Manuelle",
            mode="rental",
            status="available",
        ),
    ]

    db.add(admin)
    db.add(user)
    db.add_all(vehicles)
    db.commit()

    rental_vehicle = db.query(Vehicle).filter(Vehicle.mode == "rental").first()

    application = Application(
        user_id=user.id,
        vehicle_id=rental_vehicle.id,
        application_type="rental",
        status="pending",
        message="Dossier de test créé automatiquement.",
    )

    db.add(application)
    db.commit()


@pytest.fixture()
def db_session():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    TestingSessionLocal = sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine,
    )

    Base.metadata.create_all(bind=engine)

    db = TestingSessionLocal()

    seed_test_database(db)

    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture()
def client(db_session, tmp_path, monkeypatch):
    monkeypatch.setattr(settings, "upload_dir", tmp_path / "uploads")

    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db

    yield TestClient(app)

    app.dependency_overrides.clear()


def auth_headers(
    client: TestClient,
    email: str = USER_EMAIL,
    password: str = USER_PASSWORD,
) -> dict[str, str]:
    response = client.post(
        "/auth/login",
        json={
            "email": email,
            "password": password,
        },
    )

    assert response.status_code == 200

    return {
        "Authorization": f"Bearer {response.json()['access_token']}"
    }


def admin_headers(client: TestClient) -> dict[str, str]:
    return auth_headers(
        client,
        ADMIN_EMAIL,
        ADMIN_PASSWORD,
    )