"""empty message

Revision ID: 47b4b9af6b7c
Revises: 7dd2f5f465dc
Create Date: 2023-05-01 14:29:01.595768

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '47b4b9af6b7c'
down_revision = '7dd2f5f465dc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.drop_column('votes')

    with op.batch_alter_table('request', schema=None) as batch_op:
        batch_op.add_column(sa.Column('votes', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('request', schema=None) as batch_op:
        batch_op.drop_column('votes')

    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.add_column(sa.Column('votes', mysql.INTEGER(), autoincrement=False, nullable=True))

    # ### end Alembic commands ###
