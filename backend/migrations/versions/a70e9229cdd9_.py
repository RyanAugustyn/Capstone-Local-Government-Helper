"""empty message

Revision ID: a70e9229cdd9
Revises: c4d7f9729c0f
Create Date: 2023-04-26 11:26:57.774636

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a70e9229cdd9'
down_revision = 'c4d7f9729c0f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('message',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('is_official', sa.Boolean(), nullable=False),
    sa.Column('votes', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('request',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('progress', sa.Integer(), nullable=True),
    sa.Column('seen', sa.Boolean(), nullable=True),
    sa.Column('assigned_to', sa.String(length=255), nullable=True),
    sa.Column('latitude', sa.Integer(), nullable=True),
    sa.Column('longitude', sa.Integer(), nullable=True),
    sa.Column('requester', sa.String(length=255), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('street_address', sa.String(length=255), nullable=False))
        batch_op.add_column(sa.Column('city', sa.String(length=255), nullable=False))
        batch_op.add_column(sa.Column('zip', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('phone', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('blocked', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('position', sa.String(length=255), nullable=True))
        batch_op.create_unique_constraint(None, ['username'])
        batch_op.create_unique_constraint(None, ['email'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('position')
        batch_op.drop_column('blocked')
        batch_op.drop_column('phone')
        batch_op.drop_column('zip')
        batch_op.drop_column('city')
        batch_op.drop_column('street_address')

    op.drop_table('request')
    op.drop_table('message')
    # ### end Alembic commands ###
