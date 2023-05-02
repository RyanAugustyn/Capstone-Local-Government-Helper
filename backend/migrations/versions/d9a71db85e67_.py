"""empty message

Revision ID: d9a71db85e67
Revises: d35479947422
Create Date: 2023-05-02 14:15:05.204449

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'd9a71db85e67'
down_revision = 'd35479947422'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.alter_column('text',
               existing_type=mysql.TEXT(),
               type_=sa.String(length=2500),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.alter_column('text',
               existing_type=sa.String(length=2500),
               type_=mysql.TEXT(),
               existing_nullable=False)

    # ### end Alembic commands ###
