"""empty message

Revision ID: 489826a0222c
Revises: 47b4b9af6b7c
Create Date: 2023-05-01 15:09:39.697004

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '489826a0222c'
down_revision = '47b4b9af6b7c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(length=255), nullable=False))
        batch_op.drop_constraint('message_ibfk_1', type_='foreignkey')
        batch_op.drop_column('user_id')

    with op.batch_alter_table('request', schema=None) as batch_op:
        batch_op.add_column(sa.Column('message_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('request_ibfk_1', type_='foreignkey')
        batch_op.create_foreign_key(None, 'message', ['message_id'], ['id'])
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('request', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', mysql.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('request_ibfk_1', 'user', ['user_id'], ['id'])
        batch_op.drop_column('message_id')

    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', mysql.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('message_ibfk_1', 'user', ['user_id'], ['id'])
        batch_op.drop_column('username')

    # ### end Alembic commands ###
