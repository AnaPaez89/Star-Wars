"""empty message

Revision ID: 2db25e39230f
Revises: 4d3f1ca31951
Create Date: 2024-09-26 13:10:09.033792

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2db25e39230f'
down_revision = '4d3f1ca31951'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('character_favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('characters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('height', sa.String(), nullable=False),
    sa.Column('mass', sa.String(), nullable=False),
    sa.Column('hair_color', sa.String(), nullable=False),
    sa.Column('skin_color', sa.String(), nullable=False),
    sa.Column('eye_color', sa.String(), nullable=False),
    sa.Column('birth_year', sa.String(), nullable=False),
    sa.Column('gender', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('followers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('planet_favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('planets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('diameter', sa.String(), nullable=False),
    sa.Column('rotation_period', sa.String(), nullable=False),
    sa.Column('orbital_period', sa.String(), nullable=False),
    sa.Column('gravity', sa.String(), nullable=False),
    sa.Column('population', sa.String(), nullable=False),
    sa.Column('climate', sa.String(), nullable=False),
    sa.Column('terrain', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('planets')
    op.drop_table('planet_favorites')
    op.drop_table('followers')
    op.drop_table('characters')
    op.drop_table('character_favorites')
    # ### end Alembic commands ###
